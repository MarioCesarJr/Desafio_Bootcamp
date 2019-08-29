import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';
import Subscription from '../models/Subscription';

class OrganizingController {
  async index(req, res) {
    const page = req.query.page || 1;

    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      limit: 5,
      offset: 5 * page - 5,
    });

    return res.json(meetups);
  }

  async show(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: File,
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    const subscriptions = await Subscription.findAll({
      where: {
        meetup_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url'],
            },
          ],
        },
      ],
      attributes: [],
    });

    return res.json({
      meetup,
      subscriptions,
    });
  }
}

export default new OrganizingController();
