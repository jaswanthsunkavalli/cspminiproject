import { Request, Response } from 'express';
import SurveyResponse from '../models/SurveyResponse.js';
import { AuthRequest } from '../middleware/auth.js';
import { SURVEY_QUESTIONS } from '../../src/constants/surveyQuestions.js';

export const getQuestions = (req: Request, res: Response): void => {
  res.json({ questions: SURVEY_QUESTIONS });
};

export const submitSurvey = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { section1, section2, section3, section4, section5, section6, isAnonymous } = req.body;

    if (!section1 || !section2 || !section3 || !section4 || !section5 || !section6) {
      res.status(400).json({ error: 'Please answer all questions across all 6 survey sections.' });
      return;
    }

    const response = await SurveyResponse.create({
      respondent: isAnonymous ? undefined : req.user?.id,
      isAnonymous: !!isAnonymous,
      section1,
      section2,
      section3,
      section4,
      section5,
      section6,
    });

    res.status(201).json({
      message: 'Survey response recorded successfully! Thank you for contributing to Kuntamukkala Smart Village planning.',
      responseId: response._id,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to record survey response.' });
  }
};

export const getSurveyAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalResponses = await SurveyResponse.countDocuments();
    const responses = await SurveyResponse.find().lean();

    // Aggregate statistics across key survey metrics
    const analytics: Record<string, Record<string, number>> = {};

    responses.forEach((resp) => {
      ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'].forEach((secKey) => {
        const sec = (resp as any)[secKey];
        if (sec && typeof sec === 'object') {
          Object.entries(sec).forEach(([qId, answer]) => {
            if (typeof answer === 'string') {
              if (!analytics[qId]) analytics[qId] = {};
              analytics[qId][answer] = (analytics[qId][answer] || 0) + 1;
            }
          });
        }
      });
    });

    res.json({
      totalResponses,
      analytics,
      questions: SURVEY_QUESTIONS,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to calculate survey analytics.' });
  }
};
