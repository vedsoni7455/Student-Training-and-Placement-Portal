import multer from 'multer';
import admin from 'firebase-admin';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configure multer for file uploads
const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPEG, PNG are allowed.'));
    }
  }
});

// Upload file to Firebase Storage
export const uploadToFirebase = async (file, folder, fileName) => {
  try {
    if (!admin.apps.length) {
      throw new Error('Firebase Admin not initialized');
    }

    const bucket = admin.storage().bucket();
    const fileExtension = path.extname(file.originalname);
    const uniqueFileName = `${fileName || uuidv4()}${fileExtension}`;
    const filePath = `${folder}/${uniqueFileName}`;

    const fileUpload = bucket.file(filePath);
    
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        metadata: {
          originalName: file.originalname,
          uploadedAt: new Date().toISOString()
        }
      }
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        // Make the file publicly accessible
        await fileUpload.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
        resolve({
          url: publicUrl,
          fileName: uniqueFileName,
          originalName: file.originalname,
          size: file.size,
          contentType: file.mimetype
        });
      });

      stream.end(file.buffer);
    });
  } catch (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }
};

// Delete file from Firebase Storage
export const deleteFromFirebase = async (filePath) => {
  try {
    if (!admin.apps.length) {
      throw new Error('Firebase Admin not initialized');
    }

    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);
    
    const [exists] = await file.exists();
    if (exists) {
      await file.delete();
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(`File deletion failed: ${error.message}`);
  }
};

// Generate signed URL for temporary access
export const generateSignedUrl = async (filePath, expiresInMinutes = 15) => {
  try {
    if (!admin.apps.length) {
      throw new Error('Firebase Admin not initialized');
    }

    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);
    
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + expiresInMinutes * 60 * 1000,
    });

    return url;
  } catch (error) {
    throw new Error(`Signed URL generation failed: ${error.message}`);
  }
};
