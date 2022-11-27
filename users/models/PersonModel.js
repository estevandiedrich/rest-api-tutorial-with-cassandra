module.exports = {
    fields: {
        id: {
            type: "uuid",
            default: { "$db_function": "uuid()" }
        },
        firstName: "text",
        lastName: "text",
        email: "text",
        password: "text",
        permissionLevel: "int",
        created: "timestamp"
    },
    key: ["id"],
    indexes: ["email"],
    table_name: "person"
}