import { Request, Response, NextFunction } from 'express';

export const viewOverAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Replace this with dynamic data retrieval if needed
    const obj = {
      totalProjects: 4,
      totalApplications: 9,
      activeApplications: 9,
      activeFrontEnds: 4,
      activeAPIs: 4,
    };

    res.status(200).json({ data: obj });
  } catch (error: unknown) {
    console.error('Error in viewOverAll:', error);
    next(error);
  }
};
