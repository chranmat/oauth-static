export default function matchUPN(upn, patterns) {

  try {
    if (typeof patterns !== 'string') {
      console.log('UPN patterns defined incorrectly! Use environment variable UPN_PATTERNS to define!')
      return false;
    }

    patterns = patterns.split(',').map(pattern => pattern.trim());

    return patterns.some(pattern => {

      // Match single user records
      if (!pattern.startsWith('*')) {
        const userMatch = (pattern === upn)
        console.log(`USER_MATCH ${upn} -> ${pattern} -> ${userMatch}`);

        return userMatch;
      }

      // Match domain patterns starting with *
      if (pattern.startsWith('*')) {
        const domainPattern = pattern.slice(1); // Get the domain part after '*'
        const emailDomain = upn.substring(upn.indexOf('@'));

        const domainMatch = (emailDomain === domainPattern);
        console.log(`DOMAIN_MATCH ${emailDomain} -> ${domainPattern} -> ${domainMatch}`);

        return domainMatch
      }

      return false;
    });
  }
  catch (e) {
    console.log('There was an issue with matching UPN patterns! Check environment variable UPN_PATTERNS and try again!')
    process.exit(1);
  }
}
