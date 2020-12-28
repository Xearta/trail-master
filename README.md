# Trail Master Application

Trail Master is a SPA (Single Page Application) that allows users to create, view, update, and delete *hiking* trails. The user can mark trails as completed, sort and filter trails, and even comment on the trails! The application utilizes Vanilla JavaScript, HTML, and CSS for the front-end and Ruby on Rails for the backend API. 

## Preview of Homepage
<img src="https://i.imgur.com/aomNipD.png" />

## Preview of Trail Page
<img src="https://i.imgur.com/aCLYNLq.png" />

## Preview of Create A Trail Modal
<img src="https://i.imgur.com/S0EOba0.png" />


## Usage
This application is currently only available to run locally.

First clone this repo and run the following commands:
```
bundle install
rails db:create
rails db:migrate
rails db:seed
rails s
```
If everything runs smoothly, the server should be running on your machine! Navigate to the `index.html` file in the `./trail-master-frontend` folder and view the application!

## Endpoints - Trails
|  Name |     Path    | HTTP Verb |        Purpose        |
|:-----:|:-----------:|:---------:|:---------------------:|
| Index |   /trails   |    GET    |  Displays all trails  |
|  Show | /trails/:id |    GET    | Displays single trail |

## Endpoints - Comments
|  Name |    Path   | HTTP Verb |        Purpose        |
|:-----:|:---------:|:---------:|:---------------------:|
| Index | /comments |    GET    | Displays all comments |


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/Xearta/trail-master. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The app is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
