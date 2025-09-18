const loginWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  console.log(email, password);
};

export const AuthServices = {
  loginWithEmailAndPassword,
};
