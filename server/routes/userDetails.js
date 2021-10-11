const express = require('express')

module.exports = (controllers, validateDto) => {
  const router = express.Router()
  /**
   * @openapi
   * components:
   *  schemas:
   *    Todo:
   *      type: object
   *      required:
   *        - title
   *        - update_by
   *        - due_date
   *        - is_completed
   *      properties:
   *        title:
   *          type: string   
   *        updated_by:
   *          type: string
   *        due_date:
   *          type: string
   *          format: date
   *        is_completed:
   *          type: boolean  
   */

  /**
   * @openapi
   * components:
   *  schemas:
   *    PublishEmail:
   *      type: array
   *      items:
   *        type: object
   *        properties:
   *          email:
   *            type: string
   *            format: email
   *          role:
   *            type: string
   */

  /**
   * @openapi
   * components:
   *  schemas:
   *    Error:
   *      type: object
   *      required:
   *        - error
   *      properties:
   *        error:
   *          type: string
   */

  /**
   * @openapi
   * /todos:
   *  post:
   *    tags:
   *    - todos
   *    description: Create a todo 
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Todo'
   *    responses:
   *      201:
   *        description: Created
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Todo'
   */
  router.post('/', validateDto.insertUserDetails, controllers.insertUserDetails)


  /**
   * @openapi
   * /todos/{todo_id}:
   *  get:
   *    tags:
   *    - todos
   *    description: Get todo based on access-privilege in AccessControls table of database
   *    parameters:
   *      - in: path
   *        name: todo_id
   *        schema:
   *          type: integer
   *        required: true
   *    responses:
   *      200:
   *        description: OK
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Todo'
   *      403:
   *        description: No access-privilege
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Error'
   */
  router.get('/', controllers.getUserDetails)


  return router
}