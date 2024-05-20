import { NextApiRequest, NextApiResponse } from 'next';
import { exitPreview } from '@prismicio/next';
import { useRouter } from 'next/navigation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return exitPreview({ req, res });
}
