import {UpdateUserDTO, UserDTO} from "../api/config/dto";
import {updateUser} from "../api/userApi";

export const changeUserSettings = async (token: string, id:number, stepGoal:number, height:number, stepSize:number): Promise<UserDTO> => {
    const updatedUser: UpdateUserDTO = {
        stepGoal: stepGoal,
    }

    if (height && stepSize) {
        throw new Error('Bitte gib nur einen Wert an');
    } else if (height < 0 || isNaN(height)) {
        throw new Error('Bitte gib eine gültige Größe an');
    } else if (stepSize < 0 || isNaN(stepSize)) {
        throw new Error('Bitte gib eine gültige Schrittweite an');
    } else if (stepGoal <= 0 || isNaN(stepGoal)) {
        throw new Error('Bitte gib ein gültiges Schrittziel an');
    }

    if (height !== 0) {
        updatedUser.height = height;
    } else if (stepSize !== 0) {
        updatedUser.stepSize = stepSize;
    }

    return await updateUser(token, id, updatedUser);

}