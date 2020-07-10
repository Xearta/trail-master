# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Trail.create(name: "Test Trail", start_location: "Location 1", end_location: "End Location", distance: 245, difficulty: 1, completion_time: 200, elevation_gain: 400, completed: true);
Trail.create(name: "Trail 2", start_location: "Location 2", end_location: "End Location", distance: 124, difficulty: 3, completion_time: 200, elevation_gain: 100, image_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.rootsrated.com%2Fimage%2Fupload%2Fs--N3bqAZuL--%2Ft_rr_large_natural%2Fs2otome5vkepsjqoazoi.jpg&f=1&nofb=1", completed: false);
Trail.create(name: "Quandary Peak Trail", start_location: "Colorado, USA", end_location: "End Location", distance: 2200, difficulty: 5, completion_time: 200, elevation_gain: 2457, image_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-assets.alltrails.com%2Fuploads%2Fphoto%2Fimage%2F21351516%2Fextra_large_fd454c40ba71b87be16f73301228ae47.jpg&f=1&nofb=1", completed: false);
Trail.create(name: "Highline Trail", start_location: "Montana, USA", end_location: "End Location", distance: 541, difficulty: 4, completion_time: 200, elevation_gain: 1243, image_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-assets.alltrails.com%2Fuploads%2Fphoto%2Fimage%2F21284590%2Fextra_large_28669228a55eced52ca8b46b976fc3ec.jpg&f=1&nofb=1", completed: true);
Trail.create(name: "Lake Lansing North Trail", start_location: "Michigan, USA", end_location: "End Location", distance: 25, difficulty: 2, completion_time: 200, elevation_gain: 75, image_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-assets.alltrails.com%2Fuploads%2Fphoto%2Fimage%2F11261743%2Fextra_large_e2f0def83d996ee6321bde1008ef2fbc.jpg&f=1&nofb=1", completed: false);

Comment.create(trail_id: 1, name: "Frank", content: "This trail is super cool!");
Comment.create(trail_id: 1, name: "Bob", content: "Be careful of the snakes in this area!");
Comment.create(trail_id: 1, name: "Bob", content: "This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! ");
Comment.create(trail_id: 2, name: "Bob", content: "This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! ");