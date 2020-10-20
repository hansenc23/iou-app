## I OWE YOU - Documentation
App link: https://ioweyou.netlify.app/


## How to run this project?

### Client
On the project root directory, run the following commands:
```
cd client
npm install
npm start
```

### Server
On the project root directory, run the following commands in a seperate terminal:
```
npm install
npm run server
```
## Project Structure
### Front-end (deployed to Netlify)
File structure:

![alt text](https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/client-file-structure.png)

- Components folder: (contains all component files)
	```
	Every component has its own folder containing:
	- JS file (e.g. Component.js)
	- CSS file (e.g. Component.css)
	```
- pages folder: (contains page component files)
- hooks folder: (contains custom hooks)
- assets folder: (contains images)
---
### Back-end (deployed to Elastic Beanstalk)

#### CI/CD flow:

![alt text](https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/pipeline.png)



#### System architecture:
![alt text](https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/iou-architecture-2.png)



#### File structure:
![alt text](https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/server-file-structure.png)


