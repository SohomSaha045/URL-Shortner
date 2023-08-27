# URL-Shortner

URL Shortner API using Node.js , MongoDB , POSTMAN , Express.js , SHORTID

Api to convert url into short url's for redirection

Endpoints:

http://localhost:8001/url/                              [ POST ]   ->  used to find the short url

http://localhost:8001/url/:shortId                      [ GET ]    ->  used for redirection to the original website

http://localhost:8001/url/analytics/:shortId            [ GET ]    -> used to get analytics data on the short url number of clicks and time-stamp 

