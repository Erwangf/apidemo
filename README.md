# apidemo
An example API
Hosted at : https://api-demo-123456.herokuapp.com

# Routes

## GET ALL WORKMEN
GET /workmen

## Get a specific Workman
GET /workmen/:workmanid
ex : /workmen/13e21f12

## CREATE a workman
POST /workmen
params : 
- username : String, required, unique
- name : String, required
- surname : String, required
- skills : [String]
- description : String
- city : String

## UPDATE a workman
PATCH /workmen/:workmanid
- name : String, required
- surname : String, required
- skills : [String]
- description : String
- city : String

## DELETE a workman
DELETE /workmen/:workmanid

:)