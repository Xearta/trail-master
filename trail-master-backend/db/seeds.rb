# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Trail.create(name: "Lost Coast Trail", start_location: "Mattole Beach, California", end_location: "Black Sands Beach, California", distance: 24.6, difficulty: 2, completion_time: 12, elevation_gain: 2600, image_url: "images/trails/lost-coast.jpg", completed: false)
Trail.create(name: "Tonto Trail", start_location: "Garnet, Grand Canyon, Arizona", end_location: "Hermit Creek, Grand Canyon, Arizona", distance: 95, difficulty: 4, completion_time: 72, elevation_gain: 800, image_url: "images/trails/tonto-trail.jpg", completed: false)
Trail.create(name: "Trans-Catalina Trail", start_location: "Hermit Gluch, Catalina Island", end_location: "Two Harbors, Catalina Island", distance: 38.5, difficulty: 4, completion_time: 72, elevation_gain: 9600, image_url: "images/trails/catalina-trail.jpg", completed: true)
Trail.create(name: "Mount Katahdin", start_location: "Mount Katahdin, Maine", end_location: "Mt. Katahdin Summit, Maine", distance: 9, difficulty: 5, completion_time: 12, elevation_gain: 4200, image_url: "images/trails/katahdin-trail.jpg", completed: false)
Trail.create(name: "Kalalau Trail", start_location: "Ke'e Beach, Hawaii", end_location: "Kalalu Beach, Hawaii", distance: 22, difficulty: 2, completion_time: 48, elevation_gain: 800, image_url: "images/trails/kalalu-trail.jpg", completed: true)
Trail.create(name: "The Wave", start_location: "Coyote Buttes North Trailhead, Arizona", end_location: "Coyote Buttes North Trailhead, Arizona", distance: 5.2, difficulty: 1, completion_time: 4, elevation_gain: 200, image_url: "images/trails/wave-trail.jpg", completed: false)
Trail.create(name: "Cracker Lake", start_location: "Glacier National Park, Montana", end_location: "Glacier National Park, Montana", distance: 12.6, difficulty: 1, completion_time: 24, elevation_gain: 1650, image_url: "images/trails/cracker-trail.jpg", completed: false)
Trail.create(name: "Long's Peak", start_location: "Allenspark, Colorado", end_location: "Allenspark, Colorado", distance: 14.8, difficulty: 5, completion_time: 24, elevation_gain: 5039, image_url: "images/trails/longs-peak-trail.jpg", completed: false)
Trail.create(name: "The Narrows", start_location: "Zion National Park, Utah", end_location: "Zion National Park, Utah", distance: 16, difficulty: 2, completion_time: 48, elevation_gain: 542, image_url: "images/trails/narrows-trail.jpg", completed: true)
Trail.create(name: "Half Dome", start_location: "Yosemite National Park, California", end_location: "Yosemite National Park, California", distance: 17, difficulty: 5, completion_time: 14, elevation_gain: 2500, image_url: "images/trails/half-dome-trail.jpg", completed: false)




Comment.create(trail_id: 1, name: "Frank", content: "This trail is super cool!")
Comment.create(trail_id: 1, name: "Bob", content: "Be careful of the snakes in this area!")
Comment.create(trail_id: 1, name: "Bob", content: "This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! ")
Comment.create(trail_id: 2, name: "Bob", content: "This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! This is an example of a really long comment! ")
Comment.create(trail_id: 6, name: "Bob", content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique, harum eum fugiat ipsam nobis debitis dolore quaerat illum iusto modi fuga, cum dolores architecto velit quam vitae magnam, blanditiis consequatur! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique, harum eum fugiat ipsam nobis debitis dolore quaerat illum iusto modi fuga, cum dolores architecto velit quam vitae magnam, blanditiis consequatur!")
Comment.create(trail_id: 10, name: "Frankie", content: "Coolest Trail. Super hard!")
Comment.create(trail_id: 10, name: "Bob", content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique, harum eum fugiat ipsam nobis debitis dolore quaerat illum iusto modi fuga, cum dolores architecto velit quam vitae magnam, blanditiis consequatur! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique, harum eum fugiat ipsam nobis debitis dolore quaerat illum iusto modi fuga, cum dolores architecto velit quam vitae magnam, blanditiis consequatur!")
Comment.create(trail_id: 10, name: "Sam", content: "Really hard! Coudldn't even finish it!")