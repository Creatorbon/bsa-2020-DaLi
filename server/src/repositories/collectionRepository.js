import { Op } from 'sequelize';
import models from '../models/index';
import BaseRepository from './baseRepository';
import { DEFAULT_COLLECTIONS, ACCESS_GRANTED, ACCESS_LIMITED } from '../config/types';

class CollectionRepository extends BaseRepository {
  getCollection(id) {
    return this.model
      .findAll({
        where: { id },
        include: [
          {
            model: models.Visualization,
            as: 'visualizations',
          },
          {
            model: models.Dashboard,
            as: 'dashboards',
            include: [
              {
                model: models.Visualization,
              },
            ],
          },
        ],
      })
      .then((result) => result[0]);
  }

  getDefaultCollections() {
    return this.model
      .findAll({
        where: { name: DEFAULT_COLLECTIONS },
        include: [
          {
            model: models.Visualization,
            as: 'visualizations',
          },
          {
            model: models.Dashboard,
            as: 'dashboards',
            include: [
              {
                model: models.Visualization,
              },
            ],
          },
        ],
      })
      .then((result) => result[0]);
  }

  getAllCollections(id) {
    return this.model.findAll({
      where: { [Op.or]: [{ users_id: null }, { users_id: id || null }] },
    });
  }

  getCollectionAccess(id, userId) {
    return this.model
      .findOne({
        where: { id },
        attributes: ['id'],
        include: [
          {
            model: models.PermissionCollections,
            attributes: ['permissionGranted'],
            where: {
              [Op.or]: [{ permissionGranted: ACCESS_GRANTED }, { permissionGranted: ACCESS_LIMITED }],
            },
            include: [
              {
                model: models.UserGroups,
                as: 'userGroups',
                attributes: ['id'],
                include: [
                  {
                    model: models.User,
                    where: { id: userId },
                    attributes: [],
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((result) =>
        result.PermissionCollections.map((accessType) => {
          return accessType.userGroups !== null ? accessType.permissionGranted : null;
        })
      );
  }

  getInitialCollectionId() {
    return this.model
      .findAll({
        where: { name: 'Our analytics' },
        attributes: ['id'],
      })
      .then((result) => result[0].id);
  }

  getAllWithGroupsPermission() {
    return this.model
      .findAll({
        attributes: ['id', 'name', 'description'],

        include: [
          {
            model: models.PermissionCollections,
            attributes: ['permissionGranted'],
            include: [
              {
                model: models.UserGroups,
                as: 'userGroups',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      })
      .then((result) =>
        result.map((collection) => {
          const groups = collection.PermissionCollections.map((group) => {
            return {
              groupId: group.userGroups.id,
              groupName: group.userGroups.name,
              access: group.permissionGranted,
            };
          });
          return {
            id: collection.id,
            name: collection.name,
            description: collection.description,
            groups,
          };
        })
      );
  }

  getCollectionWithGroupsPermission(id) {
    return this.model
      .findOne({
        where: { id },
        attributes: ['id', 'name', 'description'],

        include: [
          {
            model: models.PermissionCollections,
            attributes: ['permissionGranted'],
            include: [
              {
                model: models.UserGroups,
                as: 'userGroups',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      })
      .then((result) => {
        const groups = result.PermissionCollections.map((group) => {
          return {
            id: group.userGroups.id,
            name: group.userGroups.name,
            access: group.permissionGranted,
          };
        });
        return {
          id: result.id,
          name: result.name,
          description: result.description,
          groups,
        };
      });
  }
}
export default new CollectionRepository(models.Collection);
