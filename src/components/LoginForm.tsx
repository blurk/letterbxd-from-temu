import { useEffect } from 'react';
import { useActionState } from 'react';
import { signIn } from '../actions';
import Loader from './Loader';

type Props = {
  onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: Props) {
  const [data, formAction, isPending] = useActionState(signIn, null);

  useEffect(() => {
    if (data?.user && onSuccess) onSuccess();
  }, [data, onSuccess]);

  return (
    <form action={formAction} className="login-form">
      <fieldset disabled={isPending}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />

        <div>
          {isPending ? <Loader /> : <button type="submit">Sign in</button>}
        </div>

        {data?.error && <div role="alert">{data.error}</div>}
      </fieldset>
    </form>
  );
}
