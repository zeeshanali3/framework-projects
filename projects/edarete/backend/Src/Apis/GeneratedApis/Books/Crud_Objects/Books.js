/* CRUD Objects for table: books */
      
      const parameters = require('./CRUD_parameters');
      global.CrudBooks_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      {                      
                        platformIP : ['*'],
                        supported: ['*'],
                        config: {
                          features: {
                            multistep: false,
                            parameters: true,
                            pagination: true,
                          },
                          communication: {
                            encryption: {
                              platformEncryption: true,
                              accessToken: true
                            },
                          },
                          verification: {
                            otp: false,
                            accessToken: false,
                          }
                        }
                      }
                    ],
                    data: {
                      parameters: parameters,
                      apiInfo: {
                      
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          preProcessFunction: [],
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO books (course_id, book_ibn, book_name, created_by, updated_by) VALUES ({{books_courseId}}, {{books_bookIbn}}, {{books_bookName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE books SET course_id = {{books_courseId}}, book_ibn = {{books_bookIbn}}, book_name = {{books_bookName}} WHERE book_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, books.book_id as books_id, books.book_id as id, books.book_id as books_bookId,books.course_id as books_courseId,books.book_ibn as books_bookIbn,books.book_name as books_bookName,books.status as books_status,books.created_by as books_createdBy,books.updated_by as books_updatedBy,books.created_at as books_createdAt,books.updated_at as books_updatedAt FROM books  Where books.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT books.book_id as books_id, books.book_id as id, books.book_id as books_bookId,books.course_id as books_courseId,books.book_ibn as books_bookIbn,books.book_name as books_bookName,books.status as books_status,books.created_by as books_createdBy,books.updated_by as books_updatedBy,books.created_at as books_createdAt,books.updated_at as books_updatedAt FROM books  WHERE book_id = {{id}} OR book_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE books SET status = 'inactive' WHERE book_id = {{id}}"},           
                            database: "mainDb"

                            ,
                          }
                        },
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                          crudFunction: "crudApiGenerator"
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                        permission: { Add: "add_books", View: "view_books", Update: "update_books", Delete: "delete_books", List: "list_books" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Books CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Books.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudBooks_object}