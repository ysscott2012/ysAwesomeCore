// var env = process.env.NODE_ENV || 'development'; //set env variables for dev or test.
//
// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/Section508Dash';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/Section508DashTest';
//  }

// Below two lines are the AWS Dev/Demo environment (developement Envirnoment)
// TODO: add production to ENV configuration so we don't have to comment or uncomment lines
// productionURL
process.env.PORT = 3000;
process.env.MONGODB_URI = 'ys:ys@ec2-34-225-194-59.compute-1.amazonaws.com:27017/ysAwesome';


//  Local database setup (YS's local)
//  process.env.PORT = 3000;
//  process.env.MONGODB_URI = 'mongodb://localhost:27017/ysAwesome';

