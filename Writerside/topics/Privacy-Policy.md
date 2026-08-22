# Privacy Policy

**Version 1.1 - effective 22 August 2026**

## 1. Controller and scope

For the processing described in this Privacy Policy, the data controller is:

- **Controller:** Vedran Novak
- **Status and location:** Individual software developer in the Republic of Croatia
- **Privacy contact:** [%support_email%](mailto:%support_email%)

This Privacy Policy applies to the **%product%** plugin (`%plugin_id%`) for JetBrains IDEs (the **"Plugin"**), this
documentation website, support communications, optional crash reports, and public issues or reviews relating to the
Plugin.

I have not appointed a data-protection officer because the current processing does not require one. If the responsible
person or legal entity changes, this Policy will be updated before that entity begins processing under it.

## 2. The short version

- The Plugin is currently free and does not require an account, purchase, subscription, or license key issued by me.
- The Plugin contains no developer-operated usage analytics, advertising tracker, remote configuration, or behavioral
  profiling.
- Source code, credentials, and Azure DevOps content are not routed through or stored on infrastructure I operate.
- Azure DevOps requests go directly from your IDE to the organization or server you configured.
- Optional AI requests go directly to the provider or local tool you configured. The Plugin ships with no default
  hosted AI endpoint.
- Credentials are stored in the JetBrains IDE's PasswordSafe, normally backed by your operating-system keychain.
- Crash reports are sent by your JetBrains IDE, not by the Plugin, and reach me through the JetBrains Marketplace
  Exception Analyzer. They are sent when you press the report button, or automatically if you have enabled your IDE's
  automatic exception reporting. The Plugin does not redact them and cannot, so a report may contain personal data.
- I may receive personal data when you contact me, submit a crash report, post a public issue or review, or make a
  data-protection request.
- I do not sell personal data or use it for advertising.

## 3. Data-protection roles and data flows

Different parties are responsible for different parts of the system:

| Activity | Who receives the data | My role |
|----------|-----------------------|---------|
| Azure DevOps use | Your Microsoft Azure DevOps organization or on-premises server | I do not receive this traffic or content |
| User-configured AI feature | The AI provider, server, or CLI tool you selected | I do not receive the request or response |
| IDE-connected MCP agent | Your agent and its model provider, according to your setup | I do not receive the agent's data |
| Crash report | JetBrains s.r.o., which receives and hosts the report and makes it available to me through the Marketplace Exception Analyzer | JetBrains controls its collection and hosting under its own agreement; I am controller for what I do with a report after I access it |
| JetBrains Marketplace | JetBrains distributes the Plugin and operates accounts, downloads, and reviews | JetBrains controls its processing; I control only personal data I later receive or use |
| Documentation website | GitHub Pages | GitHub processes hosting and security data under its notice; I do not receive raw visitor logs |
| Support email or public issue | Me and the email or GitHub service used | I control my support use; the platform also processes data under its own terms |

If your employer or another organization provides your Azure DevOps account, AI provider, JetBrains account, or device,
that organization may also be a controller of your personal data. Consult its privacy notice and policies.

## 4. Personal data I process

| Activity | Personal data that may be processed | Purpose | GDPR legal basis | Retention |
|----------|-------------------------------------|---------|------------------|-----------|
| Crash report | Error text and stack trace as produced by the failing code; Plugin, IDE, Java, OS and architecture information; the identifier of your last IDE action; identifiers of your non-bundled plugins; an installation identifier your IDE generates for error reporting; text you type; possible connection metadata | Receive the report; diagnose, secure, and fix the Plugin | Your consent expressed by pressing the report button after the IDE's notice, or by enabling automatic exception reporting in your IDE (Article 6(1)(a)) | Governed by JetBrains' retention for the Exception Analyzer service |
| Support, privacy, or security request | Name, email address, message, attachments, diagnostics, and correspondence | Respond to your request, provide support, protect the Plugin and users, and establish or defend legal claims | Steps you request relating to the EULA (Article 6(1)(b)); legal obligation (Article 6(1)(c)); or legitimate interests (Article 6(1)(f)), depending on the request | Normally up to 24 months after closure; longer only where needed for a legal obligation or claim |
| Public GitHub issue, discussion, or Marketplace review | Public profile, post, attachments, and my public response | Community support, defect tracking, and product improvement | Steps you request and legitimate interests in support and product improvement (Articles 6(1)(b) and 6(1)(f)) | Public until you or the platform removes it, subject to its retention rules |

My legitimate interests are maintaining a secure and reliable Plugin, answering users, preventing misuse, and
protecting legal rights. I balance those interests against the nature of the data, your reasonable expectations,
minimization measures, and your rights.

I do not intentionally collect special-category personal data, government identifiers, financial-account credentials,
or secrets. Do not include them in report descriptions, support messages, or public issues. If such information is sent
unnecessarily, I may delete or redact it.

## 5. Azure DevOps data

The Plugin's core functionality exchanges data directly between your IDE and the Azure DevOps Services organization or
on-premises Azure DevOps Server that you configured. I do not operate a proxy, API gateway, account service, or database
in that path and do not receive:

- Personal Access Tokens or Microsoft Entra ID OAuth tokens
- Source code, repository contents, diffs, commits, branches, or file names
- Pull requests, work items, pipeline logs, test results, comments, votes, or user profiles
- Your organization, project, repository, or server identifiers

Azure DevOps data is requested when needed for features you use and for documented background synchronization. It is
handled under your agreement with Microsoft or the operator of your on-premises server.

### Credentials

Personal Access Tokens and OAuth refresh tokens are stored locally using the JetBrains PasswordSafe API. Depending on
your IDE and operating-system configuration, PasswordSafe is backed by macOS Keychain, Windows Credential Manager,
KWallet, Secret Service, or an encrypted IDE configuration file. Credentials are sent only to the service for which you
configured them.

See [Privacy and Data](Privacy-and-Data.md) and [Authentication](Authentication.md) for technical details and sign-out
instructions.

## 6. Optional AI features {id="ai-features"}

### No default hosted AI provider

The Plugin ships with no built-in hosted AI endpoint. Until you configure and enable a provider, local server, or CLI
tool, AI features do not transmit prompts, code, or diffs. Provider API keys are stored in PasswordSafe and are not sent
to me.

When you add or edit an API provider, the Plugin may make an authenticated model-list request to that provider so you
can select a model. That setup request contains the credential required by the provider but no source code, diff, or AI
feature prompt.

### What is sent when you invoke an AI action

| User-triggered action | Data sent to the provider you configured |
|-----------------------|------------------------------------------|
| Summarize pull request | Pull-request title, description, and code diff |
| AI code review | Per-file pull-request diffs and applicable repository instruction files |
| Analyze a failed pipeline | Selected failure and log context |
| Explain code | Contents of the selected file or selection |
| Generate commit message | Staged code diff |
| Generate pull-request title or description | Branch name, commit messages, and code diff |
| Polish grammar | Comment or description text you chose to polish |

Requests also contain the system prompt configured for the feature. Filtering and size limits are explained in
[Privacy and Data](Privacy-and-Data.md#whats-sent-to-ai-providers).

AI actions are user-triggered. The model-list request above is the only setup-time exception. A local Ollama endpoint
can keep inference on your device. With a CLI provider, the CLI controls authentication and routing under its vendor's
terms. With a remote API, the provider receives the request under the agreement and privacy terms between you or your
organization and that provider.

You can turn off AI assistance in <ui-path>Settings | Tools | DevOps Lens | AI Settings</ui-path>.

### MCP agents

If you connect an AI agent to the IDE's MCP server, the agent may ask the Plugin to retrieve Azure DevOps data. The
Plugin queries your organization with your existing local credential and returns the result to the agent; it never gives
the agent the credential itself. The agent may then send the result to its model provider.

Write-capable tools remain off until you enable **Let AI agents change Azure DevOps**. Your agent, its provider, and your
organization determine the legal basis, retention, and safeguards for data the agent receives. See
[MCP Tools](MCP-Tools.md) before enabling this feature.

## 7. Local storage and caches

The Plugin may store the following on your device or in IDE-managed project settings:

- Credentials in PasswordSafe
- Account, provider, prompt, feature, and user-interface settings
- Project-to-account selection
- Azure DevOps response caches needed for the interface
- Locally cached AI responses

This local data is under your or your organization's control. You can remove accounts, clear AI caches, reset settings,
or uninstall the Plugin. IDE backups, roaming settings, or device-management tools controlled by you or your
organization may retain copies under their own retention rules.

## 8. Crash reports {id="crash-reports"}

### Sent by your IDE, not by the Plugin

When the Plugin throws an unexpected error, your JetBrains IDE may show its standard error dialog with a **Report to the
Third-Party Plugin** button and a notice from JetBrains. Pressing that button submits one report through the JetBrains
Marketplace Exception Analyzer service, which makes it available to me as the plugin developer.

The Plugin registers for that service and contributes no code to it. It does not build, filter, redact, queue, or
transmit the report, and it operates no error-reporting endpoint of its own.

If you have enabled automatic exception reporting in your IDE - a JetBrains data-sharing setting that is off unless you
turn it on - your IDE may submit such a report without showing you the dialog first. That setting is yours and
JetBrains', not the Plugin's; the Plugin cannot enable, disable, or detect your choice.

You can withhold consent by closing the dialog and by leaving automatic exception reporting off. You may withdraw
consent for future reports by not submitting them and by turning that setting off. To request deletion of a report
already submitted, contact me with any date, time, description, or other detail that can help locate it; requests
concerning JetBrains' own copy should also be directed to JetBrains.

### Contents

A report is assembled by the IDE from the error itself. It may contain:

- The Plugin error message and stack trace exactly as the failing code produced them, with class, method, source-file,
  and line information
- Plugin version, IDE product and build, Java runtime, operating system, and architecture
- The identifier of the last IDE action performed before the error, and the identifiers of your non-bundled plugins
- An installation identifier that your IDE generates for error reporting
- The description you voluntarily type
- Connection metadata that JetBrains or its infrastructure necessarily processes, such as an IP address

The Plugin does not intentionally place credentials, source files, diffs, request bodies, pull-request content,
comments, environment variables, screenshots, or IDE logs into an error. **There is, however, no redaction step on your
device for this path**: an error message can name an organization, project, repository, server host, or file path, and
anything you type is transmitted as written. Review anything you type and do not add source code, credentials, names,
internal URLs, or confidential information.

If you would rather send something you have read yourself, use <b>Copy DevOps Lens Diagnostics</b> in the IDE's Help
menu instead. That snapshot contains only version, count and status information - no server address, organization,
project, repository or user name - is placed only on your clipboard, and is sent nowhere unless you paste and send it
yourself.

### Recipient, location, and retention

Crash reports are received and hosted by **JetBrains s.r.o.** as part of the JetBrains Marketplace Exception Analyzer
service, and are shown to me through the Marketplace developer interface. JetBrains' collection and hosting are governed
by the [JetBrains Exception Analyzer agreement](https://www.jetbrains.com/legal/agreements/exception_analyzer.html),
which your IDE links from the notice under the report dialog, and by the
[JetBrains Privacy Notice](https://www.jetbrains.com/legal/docs/privacy/privacy/). Retention of the report by that
service is determined by JetBrains, not by me.

JetBrains is established in the Czech Republic and may use group companies and subprocessors in other countries. Where
European personal data is transferred outside the EEA, the safeguards described in JetBrains' notices apply.

Reports are not published, are not posted to the public issue tracker, and are not visible to other users.

## 9. JetBrains Marketplace

JetBrains distributes the free Plugin and independently operates Marketplace accounts, installation and download
systems, security, and reviews under its own privacy notice. I do not operate those systems and the Plugin does not add
its own license-validation or Marketplace-account tracking.

As a Marketplace developer, I may see aggregate download statistics, public reviews, and information a user chooses to
send through Marketplace support channels. I do not currently receive Plugin payment-card, billing, purchase,
subscription, or paid-license data because no paid offer exists.

For JetBrains' processing, see the
[JetBrains Privacy Notice](https://www.jetbrains.com/legal/docs/privacy/privacy/).

If the Plugin later becomes paid, this Policy and the EULA will be updated before I begin processing customer, order,
subscription, tax, or license-administration data.

## 10. Documentation website and public support

This documentation is hosted on GitHub Pages. The site code does not intentionally set first-party analytics or
advertising cookies, use tracking pixels, or send search queries to an external search provider. Documentation search
runs in your browser against a same-origin index.

GitHub nevertheless logs a visitor's IP address for GitHub Pages security and may process device, usage, and cookie data
under the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
and [GitHub Cookies notice](https://docs.github.com/en/site-policy/privacy-policies/github-cookies). I do not receive
GitHub Pages raw access logs.

GitHub Issues and Discussions and JetBrains Marketplace reviews are public. Do not post credentials, private source
code, internal URLs, confidential logs, or personal data you do not want publicly visible. Deleting your post does not
guarantee deletion of quotations, notifications, forks, caches, or copies controlled by others.

## 11. Recipients and international transfers

I disclose personal data only as necessary to:

- **JetBrains**, which receives crash reports as described above and operates Marketplace reviews and support channels
- **GitHub**, when you use the hosted documentation, issue tracker, or discussions
- Professional advisers, insurers, or authorities where reasonably necessary to comply with law, protect a person,
  investigate abuse, or establish, exercise, or defend legal claims
- A successor if responsibility for the Plugin is transferred, subject to applicable notice and data-protection law

I am located in Croatia. JetBrains, GitHub, and some of their subprocessors may be based in or accessible from
countries outside the European Economic Area. Depending on the service and transfer, safeguards may include an adequacy
decision, the EU-U.S. Data Privacy Framework, or European Commission Standard Contractual Clauses. You may request
information about the safeguard relevant to data I control by contacting me.

Microsoft Azure DevOps and a user-configured AI provider receive data directly from you as described above; I do not
disclose that data because I never receive it. Their own privacy notices and contracts govern their transfers.

I do not sell personal data, rent contact lists, or disclose personal data for behavioral advertising.

## 12. Your rights

Subject to the GDPR and any applicable conditions, you may have the right to:

- Obtain information about processing and access a copy of your personal data
- Correct inaccurate or incomplete personal data
- Request erasure or restriction of processing
- Object to processing based on legitimate interests
- Receive portable data where processing is based on contract or consent and carried out by automated means
- Withdraw consent at any time where consent is the basis, without affecting earlier lawful processing
- Lodge a complaint with a supervisory authority

To exercise a right regarding data I control, email [%support_email%](mailto:%support_email%). I may ask for information
reasonably necessary to verify your identity and locate the data. I will not ask you to provide disproportionate
identifiers merely to search crash reports that are not otherwise linked to you.

You may complain to the supervisory authority where you live or work or where an alleged infringement occurred. In
Croatia, the authority is the
[Croatian Personal Data Protection Agency (AZOP)](https://azop.hr/how-to-lodge-a-complaint/), Ulica Metela Ožegovića
16, 10000 Zagreb, Croatia, email `azop@azop.hr`.

Rights concerning data controlled independently by JetBrains, Microsoft, GitHub, your organization, or an AI provider
should be directed to that controller.

## 13. Security

I use measures designed to reduce the risks appropriate to the data I control, including local credential storage, data
minimization, collecting only non-identifying values in the diagnostics snapshot, keeping credentials and content out of
Plugin error messages, access to crash reports only through my authenticated JetBrains Marketplace developer account,
encrypted transmission, and retention limits.

No security control is perfect. If I become aware of a personal-data breach, I will investigate, mitigate, document,
and notify the competent authority and affected people when required by law.

## 14. Automated decisions, advertising, and children

I do not use personal data I control for automated decision-making that produces legal or similarly significant
effects. I do not use Plugin, support, crash-report, or public-profile data for behavioral advertising or direct
marketing.

AI output generated at your request is a Plugin feature for you to review; I do not receive that output or use it to
make decisions about you.

The Plugin is a professional developer tool and is not directed to children. I do not knowingly collect children's
personal data. A parent or guardian may contact me if they believe a child submitted personal data to me.

## 15. Changes and contact

I may update this Privacy Policy when the Products, legal requirements, responsible entity, or data flows change. The
version and effective date are shown at the top. Material changes will be communicated through the Marketplace, release
notes, website, or another appropriate channel before they take effect where advance notice is required.

This Policy is published in English only. Questions, requests, and concerns may be sent to:

- **Controller:** Vedran Novak
- **Country:** Republic of Croatia
- **Email:** [%support_email%](mailto:%support_email%)

See also the [Developer End User License Agreement and Terms of Use](Terms-of-Service.md).
