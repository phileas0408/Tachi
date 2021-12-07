import useSetSubheader from "components/layout/header/useSetSubheader";
import Divider from "components/util/Divider";
import ExternalLink from "components/util/ExternalLink";
import Muted from "components/util/Muted";
import { TachiConfig } from "lib/config";
import React from "react";

export default function BarbatosPage() {
	useSetSubheader(["Import Scores", "Barbatos"]);

	return (
		<div>
			<h1 className="text-center mb-4">What Is Barbatos?</h1>
			<div>
				Barbatos is a <code>.dll</code> file that hooks into SDVX and automatically sends
				the scores to a server. {TachiConfig.name} is compatible with what Barbatos sends,
				so you can use it to submit scores!
			</div>
			<Divider />
			<h1 className="text-center my-4">Setup Instructions</h1>
			<ol className="instructions-list">
				<li>
					Download <code>barbatos.dll</code> from{" "}
					<ExternalLink href="https://f.wcal.xyz/vC3dW7cn">here</ExternalLink>.
				</li>
				<li>
					Download your config file{" "}
					<ExternalLink href="/client-file-flow/CXBarbatos">here</ExternalLink>. <br />
					<b>This file contains an API Key, which is meant to be kept secret!</b>
				</li>
				<li>
					Place all of these files inside your SDVX folder, next to your <code>.bat</code>{" "}
					file.
				</li>
				<ul className="instructions-list">
					<li>
						BemaniTools: Add <code>-K barbatos.dll</code> to your <code>.bat</code>{" "}
						file.
					</li>
					<li>
						SpiceTools: Add <code>-k barbatos.dll</code> to your <code>.bat</code> file.
					</li>
				</ul>
			</ol>
		</div>
	);
}
