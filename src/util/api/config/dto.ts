export interface UserChallengeDTO {
    challengeString: string;
    progressString: string;
    completed: boolean;
}

export interface UpdateCompetitionDTO {
    startDate: string;
    endDate: string;
    onlyUpdate: boolean;
}

export interface Competition {
    id: number;
    startDate: string;
    endDate: string;
}

export interface DayDTO {
    date: string;
    steps: number;
}

export interface StepsDTO {
    steps: number;
}

export interface DurationStepsDTO {
    startDate: string;
    endDate: string;
    steps: number;
}

export interface Group {
    id: number;
    name: string;
    numberOfEmployees: number;
}

export interface GroupCreationDTO {
    name: string;
    numberOfEmployees: number;
}

export interface GroupStepsDTO {
    group: Group;
    steps: number;
    stepsPerUser: number;
}

export interface SingleUserStepsDTO {
    noun: string;
    adjective: string;
    steps: number;
}

export interface StatisticDurationDTO {
    startDate: string;
    endDate: string;
}

export interface UserStepsDTO {
    noun: string;
    adjective: string;
    steps: number;
}

export interface AuthenticationRequestDTO {
    email: string;
    password: string;
}

export interface AuthenticationResponseDTO {
    accessToken: string;
    user: UserDTO;
}

export interface UserDTO {
    email: string;
    isAdmin: boolean;
    noun: string;
    adjective: string;
    group: Group;
    stepGoal: number;
    id: number;
    height?: number;
    stepSize?: number;
}

export interface UserCreationDTO {
    email: string;
    isAdmin: boolean;
    groupId: number;
}

export interface UserPasswordsDTO {
    password: string;
    confirmPassword: string;
}

export interface UserTokenDTO {
    token: string;
    expiresAt: string;
    user: UserDTO;
}

export interface UpdateUserDTO {
    stepGoal?: number;
    height?: number;
    stepSize?: number;
}

export interface EmailDTO {
    email: string;
}