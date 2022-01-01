import Cli from '@support/lib/Cli';

import Host from '@support/host/Host';
import Selenium from '@support/host/Selenium';
import Local from '@support/host/Local';

class HostFactory {

    createHost(): Host {
        let host: Host = new Local();

        switch (Cli.get('host')) {
            case "selenium":
                host = new Selenium();
                break;
        }

        return host;
    }
}

export default new HostFactory();
