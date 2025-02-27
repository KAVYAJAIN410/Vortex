import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbConnect } from '../../../lib/dbConnect';
import { Users } from '@/models/user.model';
import  Team  from '@/models/event1/Team.model';
import Round1Submission from '@/models/event1/round1Submission.model';

// Define Zod validation schema
const submissionSchema = z.object({
  idea: z.string().min(5, "Idea must be at least 5 characters long"),
});
const WORD_LIMIT = 200;
// Define TypeScript types for request body
interface SubmissionBody {
  track:number,
  title:string,
  idea: string;
}

// POST method for /api/register
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Authorization check
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extract token
    if (!token) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const formData: SubmissionBody = await req.json();

    console.log(token);
    const { idea , title,track} = formData;
    if (idea.split(" ").length > WORD_LIMIT) {
      return NextResponse.json({ message: `Idea must be within ${WORD_LIMIT} words.` }, { status: 400 });
    }

    // Validate input using Zod
    const validation = submissionSchema.safeParse(formData);
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: validation.error.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await Users.findOne({ email: token });
    if (!existingUser) {
      console.log(token);
      return NextResponse.json({ message: 'User not found' }, { status: 403 });
    }

    if (existingUser.event1TeamRole === 1) {
      return NextResponse.json({ message: 'User is not a leader' }, { status: 403 });
    }

    const teamId = existingUser.event1TeamId;
    const team = await Team.findOne({ _id: teamId });

    if (!team) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }
     if(team.Round1===true){
      return NextResponse.json({ message: 'idea already submitted' }, { status: 410 });
     }
     if(track<1 || track>6){
      return NextResponse.json({ message: 'track does not exist' }, { status: 410 });
     }
    const submission = new Round1Submission({
      teamName: team.teamName,
      teamId: team._id,
      createdAt: new Date(),
      IdeaDescription: idea,
      IdeaTitle:title,
      trackId:track
    });

    await submission.save();

    team.Round1 = true;
    await team.save(); // Fixed .save() call

    return NextResponse.json({ success: true, message: 'Idea submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
