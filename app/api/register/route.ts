import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbConnect } from '@/lib/dbConnect'; // Ensure your DB connection logic
import { Users } from '@/models/user.model';

// Define Zod validation schema
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  regNo: z
    .string()
    .regex(/^\d{2}[A-Za-z]{3}\d{4}$/, 'Invalid registration number format'),
  number: z
    .string()
    .regex(/^\d{10}$/, 'Invalid phone number format'),
  hostel: z.enum(['lh', 'mh', 'ds'], {
    required_error: 'Hostel selection is required',
  }),
  block: z.string().optional(),
  roomNumber: z
    .string()
    .regex(/^\d{1,4}[A-Za-z]?$/, 'Invalid room number format') // Allows up to 4 digits + 1 optional letter
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const email = authHeader.split(' ')[1];
    const formData = await req.json();

    // Parse and validate data
    const parsedData = registerSchema.parse(formData);
    const { name, regNo, number, hostel, block, roomNumber } = parsedData;

    // Ensure `block` and `roomNumber` are required for hostel residents
    if (hostel !== 'ds' && (!block || !roomNumber)) {
      return NextResponse.json(
        { message: 'Block and room number are required for hostel residents' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if the user exists in the database
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 409 });
    }

    if (existingUser.hasFilledDetails) {
      return NextResponse.json(
        { message: 'Form already filled' },
        { status: 410 }
      );
    }

    // Update user details
    existingUser.name = name;
    existingUser.regNo = regNo;
    existingUser.mobNo = number;
    existingUser.hostel = hostel;
    existingUser.block = hostel !== 'ds' ? block : null;
    existingUser.roomNumber = hostel !== 'ds' ? roomNumber : null;
    existingUser.hasFilledDetails = true;

    await existingUser.save();
   
    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
