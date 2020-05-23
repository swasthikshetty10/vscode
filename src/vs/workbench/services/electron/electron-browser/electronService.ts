/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IElectronService } from 'vs/platform/electron/node/electron';
import { IMainProcessService2 } from 'vs/platform/ipc/electron-sandbox/mainProcessService';
import { registerSingleton } from 'vs/platform/instantiation/common/extensions';
import { INativeWorkbenchEnvironmentService } from 'vs/workbench/services/environment/electron-browser/environmentService';
import { createChannelSender } from 'vs/base/parts/ipc/common/ipc';
import { IWorkbenchEnvironmentService } from 'vs/workbench/services/environment/common/environmentService';

export class ElectronService {

	_serviceBrand: undefined;

	constructor(
		@IMainProcessService2 mainProcessService: IMainProcessService2,
		@IWorkbenchEnvironmentService environmentService: INativeWorkbenchEnvironmentService
	) {
		return createChannelSender<IElectronService>(mainProcessService.getChannel('electron'), { context: environmentService.configuration.windowId });
	}
}

registerSingleton(IElectronService, ElectronService, true);
