import Link from "next/link";
import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
	return (
		<footer className="mt-10 border-t border-white/10 px-4 py-6 text-zinc-300 md:px-6">
			<div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-3">
					<Link href="/" className="inline-flex items-center">
						<Image
							src="/soli-blanco.png"
							alt="Soli logo"
							width={96}
							height={32}
							className="h-auto w-24 object-contain"
						/>
					</Link>
				</div>

				<div className="flex flex-wrap items-center gap-4 text-sm">
					<Link href="mailto:miacarinirojo@gmail.com" className="inline-flex items-center gap-2 hover:text-white">
						<HiOutlineMail className="h-4 w-4" />
						<span>miacarinirojo@gmail.com</span>
					</Link>
					<Link href="https://github.com/micarini" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
						<FaGithub className="h-4 w-4" />
						<span>micarini</span>
					</Link>
				</div>
			</div>
		</footer>
	);
}
