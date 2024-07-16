import {UpdateUserDTO, UserDTO} from "../api/config/dto";
import {updateUser} from "../api/userApi";

export const changeUserSettings = async (token: string, id:number, stepGoal:number, height:number, stepSize:number): Promise<UserDTO> => {
    const updatedUser: UpdateUserDTO = {
        stepGoal: stepGoal,
    }

    if (height !== 0) {
        updatedUser.height = height;
    } else if (stepSize !== 0) {
        updatedUser.stepSize = stepSize;
    }

    return await updateUser(token, id, updatedUser);

}