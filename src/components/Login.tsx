import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const loginFormSchema = z.object({
  username: z.string().min(6, "O usuário tem no mínimo 6 digitos"),
  password: z.string().min(5, "A senha tem no mínimo 5 digitos"),

})

type loginFormInput = z.infer<typeof loginFormSchema>

const Login: React.FC = () => {
  const { loginAccount } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
} = useForm<loginFormInput>({
    resolver: zodResolver(loginFormSchema)
  })

  async function handleLogin(data: loginFormInput) {
    const { username, password } = data;
    await loginAccount({ username, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Entrar no sistema</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                {...register('username')}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                {...register('password')}
              />
            {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>


          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;