const { test, ln, chmod } = require('shelljs');

if (test('-e', '.git/hooks')) {
    // eslint 目前暂时不开启 pre commit
    ln('-sf', '../../build/git-hooks/pre-commit', '.git/hooks/pre-commit');
    chmod('+x', '.git/hooks/pre-commit');
    ln('-sf', '../../build/git-hooks/commit-msg', '.git/hooks/commit-msg');
    chmod('+x', '.git/hooks/commit-msg');
    // ln('-sf', '../../build/git-hooks/git-jira-hook', '.git/hooks/git-jira-hook');
    // chmod('+x', '.git/hooks/git-jira-hook');
}
