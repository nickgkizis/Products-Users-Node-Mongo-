const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');

exports.options ={
    "openapi": "3.1.0",
    "info": {
        "version":"1.0.0",
        "title":"User API",
        "description":"API for managing users",
        "contact":{
            "name":"codingFactory",
            "email":"nick@example.com",
            "url":"https://example.com"
        }
    },
    "components":{
        "schemas":{
            User: m2s(User)
        }
    },
    "servers": [
        {
            "url": "http://localhost:3000",
            "description": "Development server"
        },
        {
            "url": "https://api.example.com/api",
            "description": "Testing server"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "Operations on users"
        },
        {
            "name": "Users and Products",
            "description": "Operations on products"
        },
    ],
    "paths": {
        "/api/users": {
            "get":{
                "tags": ["Users"],
                "description": "Get all users",
                "responses": {
                    "200": {
                        "description": "List of users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post":{
                "tags": ["Users"],
                "description": "Create a new user",
                "requestBody": {
                    "description": "Data for the new user",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "surname": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "email"
                                    },
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": {
                                                "type": "string"
                                            },
                                            "road": {
                                                "type": "string"
                                            }
                                        },
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                 "type": {"type":"string"},
                                                 "number": {"type":"string"}
                                            }
                                        }
                                    }
                                },
                                "required": ["username", "password", "name", "surname"]
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "User created"
                    }
                }
            }

        },
        "/api/users/{username}": {
            "get": {
                "tags": ["Users"],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "The username of the user to retrieve",
                        "type": "string"
                    }
                ],
                "description": "Get a user by username",
                "responses": {
                    "200": {
                        "description": "User retrieved",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch": {
                "tags": ["Users"],
                "description": "Patch a user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "The username of the user to update",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Data for the user update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "surname": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "email"
                                    },
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": {
                                                "type": "string"
                                            },
                                            "road": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                },
                                "required": ["email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User updated",
                        "schema": {
                            "$ref": "#/components/schema/User"
                        }
                    }
                }
            },
            "delete": {
                "tags": ["Users"],
                "description": "Delete a user by username",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "The username of the user to delete",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User deleted"
                    }
                }
            }
        },
        "/api/user-product/users/products": {
            "get": {
                "tags": ["Users and Products"],
                "description": "All user's products",
                "responses": {
                    "200": {
                        "description": "List of products"
                    }
                }
            }
        },
        "/api/user-product/{username}/products": {
            "get": {
                "tags": ["Users and Products"],
                "description": "Get products by username",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "User's products",
                        "type": "string"
                    }
                ],
                "description": "Username and products",
                "responses": {
                    "200": {
                        "description": "user and products"
                    }
                }
            },
            "post": {
                "tags": ["Users and Products"],
                "description": "Add a new product to user's list",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "User's products",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Product to add",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {
                                        "type": "string"
                                    },
                                    "products": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "product": {
                                                    "type": "string"
                                                },
                                                "cost": {
                                                    "type": "number"
                                                },
                                                "quantity": {
                                                    "type": "number"
                                                }
                                            },
                                            "required": ["quantity"]
                                        }
                                    }
                                }
                            },
                            "responses": {
                                "201": {
                                    "description": "Product added"
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Product added"
                    }
                }
            }
        },
        "/api/user-product/{username}/products/{id}": {
            "patch": {
                "tags": ["Users and Products"],
                "description": "Update product for user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "User's products",
                        "type": "string"
                    },
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "Product ID",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Product quantity to update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "product": {
                                        "type": "object",
                                        "properties": {
                                            "quantity": {"type": "number"}
                                        }
                                    }  
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Product updated"
                    }
                }
            }
        }
    }
}