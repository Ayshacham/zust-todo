'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get('redirect') ?? '/';
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const supabase = createClient();
			const { error: authError } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (authError) {
				setError(authError.message);
				return;
			}

			router.push(redirectTo);
			router.refresh();
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#191717] text-white flex flex-col items-center justify-center p-8">
			<div className="w-full max-w-sm">
				<h1 className="text-3xl font-semibold text-center mb-6">Log in</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm text-[#c8c7c7] mb-1"
						>
							Email
						</label>

						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							required
							autoComplete="email"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm text-[#c8c7c7] mb-1"
						>
							Password
						</label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="•••••••"
							required
							autoComplete="current-password"
						/>
					</div>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					<Button
						type="submit"
						variant="primary"
						size="md"
						className="w-full"
						disabled={loading}
					>
						{loading ? 'Signing in…' : 'Sign in'}
					</Button>
				</form>

				<p className="mt-6 text-center text-[#c8c7c7] text-sm">
					Don&apos;t have an account?{' '}
					<Link
						href={
							redirectTo !== '/'
								? `/register?redirect=${encodeURIComponent(redirectTo)}`
								: '/register'
						}
						className="text-[#3f95f2] hover:underline"
					>
						Sign up
					</Link>
				</p>

				<div className="mt-8 text-center">
					<LinkButton href="/" variant="secondary">
						← Back to app
					</LinkButton>
				</div>
			</div>
		</div>
	);
}
