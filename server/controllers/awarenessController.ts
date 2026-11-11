import { Request, Response } from 'express';
import AwarenessPost from '../models/AwarenessPost.js';
import ActivityLog from '../models/ActivityLog.js';
import { AuthRequest } from '../middleware/auth.js';

export const getAwarenessPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await AwarenessPost.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ posts });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch awareness posts.' });
  }
};

export const createAwarenessPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, category, description, content, image } = req.body;

    if (!title || !category || !description || !content) {
      res.status(400).json({ error: 'Please provide title, category, description, and content.' });
      return;
    }

    const newPost = await AwarenessPost.create({
      title,
      category,
      description,
      content,
      image: image || '',
      author: req.user?.id,
      authorName: req.user?.name || 'Gram Panchayat Admin',
      isPublished: true,
      publishedAt: new Date(),
    });

    if (req.user) {
      await ActivityLog.create({
        user: req.user.id,
        userName: req.user.name,
        userRole: req.user.role,
        action: 'CREATE_AWARENESS_POST',
        resourceType: 'AwarenessPost',
        resourceId: newPost._id.toString(),
        newValue: title,
      });
    }

    res.status(201).json({ message: 'Awareness post published!', post: newPost });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create awareness post.' });
  }
};

export const updateAwarenessPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, category, description, content, image, isPublished } = req.body;

    const post = await AwarenessPost.findById(id);
    if (!post) {
      res.status(404).json({ error: 'Awareness post not found.' });
      return;
    }

    if (title) post.title = title;
    if (category) post.category = category;
    if (description) post.description = description;
    if (content) post.content = content;
    if (image !== undefined) post.image = image;
    if (isPublished !== undefined) post.isPublished = isPublished;

    await post.save();

    res.json({ message: 'Awareness post updated successfully!', post });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update awareness post.' });
  }
};

export const deleteAwarenessPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await AwarenessPost.findByIdAndDelete(id);
    if (!post) {
      res.status(404).json({ error: 'Awareness post not found.' });
      return;
    }

    res.json({ message: 'Awareness post deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete awareness post.' });
  }
};
