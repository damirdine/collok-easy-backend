"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Créer des colocations
    const colocations = await queryInterface.bulkInsert(
      "colocation",
      [
        {
          id: 1,
          name: "Colocation 1",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "Colocation 2",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // Créer des utilisateurs pour chaque colocation
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        id: i + 1,
        firstname: `User${i + 1}`,
        lastname: `Lastname${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: "$argon2id$v=19$m=65536,t=3,p=4$ih7eguF5Fg+UqX/gdN1uOQ$tRwox7ZyAE5xwd2lB8RaZ9Wi0HwH6cC83VvZgyGiebM", // Devrait être haché dans une application réelle
        created_at: new Date(),
        updated_at: new Date(),
        colocation_id: (i % 2) + 1,
      });
    }

    await queryInterface.bulkInsert("user", users);

    // Mettre à jour le champ admin_user_id pour les colocations
    await queryInterface.bulkUpdate(
      "colocation",
      { admin_user_id: 1 },
      { id: 1 }
    );

    await queryInterface.bulkUpdate(
      "colocation",
      { admin_user_id: 6 },
      { id: 2 }
    );

    // Insérer des données pour la table 'objective'
    const objectives = [];
    for (let i = 0; i < 10; i++) {
      objectives.push({
        id: i + 1,
        name: `Objective ${i + 1}`,
        created_at: new Date(),
        updated_at: new Date(),
        colocation_id: (i % 2) + 1,
        created_by: (i % 10) + 1,
      });
    }

    await queryInterface.bulkInsert("objective", objectives);

    // Insérer des données pour les tableaux 'outgoing' et 'task'
    const outgoings = [];
    const tasks = [];
    const user_objectives = [];
    for (let i = 0; i < 5; i++) {
      outgoings.push({
        id: i + 1,
        final_expense: parseInt(
          Math.floor(Math.random() * (9999 - 100 + 1)) + 100
        ),
        created_at: new Date(),
        updated_at: new Date(),
        objective_id: i + 1,
      });
      user_objectives.push({
        user_id: (i % 2) + 1,
        objective_id: i + 1,
      });
    }

    for (let i = 5; i < 10; i++) {
      tasks.push({
        id: i - 4,
        estimated_duration: Math.floor(Math.random() * 5) + 1,
        created_at: new Date(),
        updated_at: new Date(),
        objective_id: i + 1,
      });
      user_objectives.push({
        user_id: (i % 2) + 1,
        objective_id: i + 1,
      });
    }

    await queryInterface.bulkInsert("outgoing", outgoings);
    await queryInterface.bulkInsert("task", tasks);
    await queryInterface.bulkInsert("user_objective", user_objectives);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_objective", null, {});
    await queryInterface.bulkDelete("task", null, {});
    await queryInterface.bulkDelete("outgoing", null, {});
    await queryInterface.bulkDelete("objective", null, {});
    await queryInterface.bulkDelete("user", null, {});
    await queryInterface.bulkDelete("colocation", null, {});
  },
};
