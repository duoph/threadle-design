// import jwt from 'jsonwebtoken';
// import { NextRequest } from 'next/server';


// export const getDataFromToken = async (req: NextRequest) => {
//     try {

//         const token = req.cookies?.get('token')?.value;

//         if (!token) {
//             throw new Error('Authorization token not found in cookies');
//         }

//         // Validate the JWT using the secret (consider using a dedicated function)
//         const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);

//         return decodedToken;
//     } catch (error) {
//         console.error('Error decoding JWT token:', error);

//         // Handle the error appropriately in your application (e.g., return an error response)
//         return { error: 'Invalid or expired token' }; // Example error handling
//     }
// };