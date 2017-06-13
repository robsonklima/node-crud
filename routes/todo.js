var mysql = require("mysql");

function ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

ROUTER.prototype.handleRoutes = function(router, pool) {
    var self = this;

    router.get("/todos", function(req, res) {
        var query = "SELECT * FROM ??";
        var vars = ["todo"];
        query = mysql.format(query,vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false,  "todos" : rows});
                }
            });
        });
    });

    router.get("/todos/:id", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var vars = ["todo"
          , "id"
          , req.params.id
        ];
        query = mysql.format(query,vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false,  "todos" : rows});
                }
            });
        });
    });

    router.post("/todos", function(req, res) {
        var query = "INSERT INTO ?? (??) VALUES (?)";
        var vars = ["todo"
          , "text"
          , req.body.text
        ];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, "details": rows});
                }
            });
        });
    });

    router.put("/todos/:id", function(req, res) {
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var vars = ["todo"
          , "text", req.body.text

          , "id", req.params.id
        ];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, "details": rows});
                }
            });
        });
    });

    router.delete("/todos/:id", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["todo",
          "id"
          , req.params.id
        ];
        query = mysql.format(query,table);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, "details": rows});
                }
            });
        });
    });

}

module.exports = ROUTER;
