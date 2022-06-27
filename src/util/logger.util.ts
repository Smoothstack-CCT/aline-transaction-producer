import { Logger } from "tslog";

const LoggerUtil = {

    getLogger: function(loggerName: string) {
        return new Logger({
            name: loggerName,
            displayInstanceName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false
        });
    }

};

export { LoggerUtil };