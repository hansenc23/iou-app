# User API Documentation



---

# Favor API Documentation

## GET Favors by ID
`GET /favors/:id`
### Parameters
Name | Type | Mandatory | Description
--- | --- | --- | ---
id|String|Yes|Favor ID

## Add New Favors
`POST /favors/create`
### Parameters
Name | Type | Mandatory | Description
--- | --- | --- | ---
ower|String|Yes|Ower User ID
owner|String|Yes|Owner User ID
favor_detail|String|Yes|Favor Details
picture_proof_id|String|Yes|Picture file name

## Update Favors Status by Favor ID
`POST /favors/update`
### Parameters
Name | Type | Mandatory | Description
--- | --- | --- | ---
id|String|Yes|Favor ID
end_time|Date|Yes|Date Object / Null

## Delete Favors by Favor ID
`POST /favors/delete`
### Parameters
Name | Type | Mandatory | Description
--- | --- | --- | ---
id|String|Yes|Favor ID

## GET All Favors by User ID
`GET /favors/all/:type/:id`
### Parameters
Name | Type | Mandatory | Description
--- | --- | --- | ---
type|String|Yes|ower / owner
id|String|Yes|User ID

