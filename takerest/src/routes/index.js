import express from "express";
import {validateRequest} from "../helpers";
import {
    combinations,
    pairs,
    customRows,
    users
} from "../handlers";
import {signin, forgot, reset} from "../auth"

const router = express.Router();

router.route('/combinations')
    .post(validateRequest(combinations.matcher), combinations.handler);

router.route('/pairs')
    .post(validateRequest(pairs.matcher), pairs.handler);

router.route('/custom-rows')
    .post(validateRequest(customRows.matcher), customRows.handler);

router.route('/signin')
    .post(validateRequest(signin.matcher), signin.handler);

router.route('/forgot')
    .post(forgot.handler);

router.route('/reset')
    .post(reset.handler);

router.route('/get_users')
    .post(users.handler);

router.route('/save_user')
    .post(validateRequest(signin.matcher), users.saveUserHandler);

router.route('/insert_user')
    .post(validateRequest(signin.matcher), users.insertUserHandler);

router.route('/remove_user')
    .post(validateRequest(signin.matcher), users.removeUserHandler);

router.route('/remove_users')
    .post(validateRequest(signin.matcher), users.removeUsersHandler);

router.route('/auth_permission')
    .post(users.authPermissionHandler);

router.route('/save_admin')
    .post(validateRequest(signin.matcher), users.saveAdminHandler);
    
export default router;