# Sweetshop API Documentation:

## GET /stock:

### returns the full stock for the store as an array of objects, and the message “200 OK Stock Data Sent”

## DELETE /stock/delete/

### deletes the object matching body.skuID and returns a message, “200 OK Stock Item Deleted.” if the ID was matched and deleted, or “Could Not Delete.” if the ID was not found

## POST  /stock/add/

### Constructs an object from the parameters in the body, assigns an ID equal to the highest extant ID + 1 and pushes it to the stock array. Returns the new stock array and “200 OK Stock Item Added” if successful

## POST /stock/update/

### checks the desired operation passed in the body (valid parameters: “minus”, “add”) and increments or decrements the stock of the passed ID by the passed amount. Returns the updated stock object and the message “200 OK Stock Updated.”
