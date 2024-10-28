# A
Bot de WhatsApp básico 
curl -qL https://www.npmjs.com/install.sh | sh

npm WARN deprecated phin@2.9.3: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
npm ERR! code 2
npm ERR! git dep preparation failed
npm ERR! command /usr/bin/node /usr/share/nodejs/npm/bin/npm-cli.js install --force --cache=/home/kocmoc/.npm --prefer-offline=false --prefer-online=false --offline=false --no-progress --no-save --no-audit --include=dev --include=peer --include=optional --no-package-lock-only --no-dry-run
npm ERR! > baileys@6.7.5 prepare
npm ERR! > tsc
npm ERR! 
npm ERR! src/Socket/messages-recv.ts(23,2): error TS2305: Module '"../Utils"' has no exported member 'NO_MESSAGE_FOUND_ERROR_TEXT'.
npm ERR! src/Socket/messages-recv.ts(70,3): error TS2339: Property 'sendPeerDataOperationMessage' does not exist on type '{ getPrivacyTokens: (jids: string[]) => Promise<BinaryNode>; assertSessions: (jids: string[], force: boolean) => Promise<boolean>; relayMessage: (jid: string, message: IMessage, { messageId: msgId, participant, additionalAttributes, additionalNodes, useUserDevicesCache, useCachedGroupMetadata, statusJidList }: Messa...'.
npm ERR! src/Socket/messages-recv.ts(85,40): error TS2339: Property 'placeholderResendCache' does not exist on type 'SocketConfig'.
npm ERR! npm WARN using --force Recommended protections disabled.
npm ERR! npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm ERR! npm WARN deprecated phin@2.9.3: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
npm ERR! npm WARN deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
npm ERR! npm WARN deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm ERR! npm WARN deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
npm ERR! npm WARN deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
npm ERR! npm WARN deprecated domexception@2.0.1: Use your platform's native DOMException instead
npm ERR! npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm ERR! npm WARN deprecated w3c-hr-time@1.0.2: Use your platform's native performance.now() and performance.timeOrigin.
npm ERR! npm WARN deprecated q@1.5.1: You or someone you depend on is using Q, the JavaScript Promise library that gave JavaScript developers strong feelings about promises. They can almost certainly migrate to the native JavaScript promise now. Thank you literally everyone for joining me in this bet against the odds. Be excellent to each other.
npm ERR! npm WARN deprecated 
npm ERR! npm WARN deprecated (For a CapTP with native promises, see @endo/eventual-send and @endo/captp)
npm ERR! npm WARN deprecated querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
npm ERR! npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm ERR! npm WARN deprecated vm2@3.9.19: The library contains critical security issues and should not be used for production! The maintenance of the project has been discontinued. Consider migrating your code to isolated-vm.
npm ERR! npm WARN deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.
npm ERR! npm ERR! code 2
npm ERR! npm ERR! path /home/kocmoc/.npm/_cacache/tmp/git-cloneoTxYAv
npm ERR! npm ERR! command failed
npm ERR! npm ERR! command sh -c tsc
npm ERR! 
npm ERR! npm ERR! A complete log of this run can be found in:
npm ERR! npm ERR!     /home/kocmoc/.npm/_logs/2024-10-27T22_41_24_570Z-debug-0.log

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/kocmoc/.npm/_logs/2024-10-27T22_41_10_969Z-debug-0.log
