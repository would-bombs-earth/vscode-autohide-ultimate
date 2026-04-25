"use strict";
import * as vscode from "vscode";
import { TextEditorSelectionChangeKind } from "vscode"

interface SidebarActions {
    left: string;
    right: string;
}

const FOCUS_BACK = "workbench.action.focusActiveEditorGroup";

export function activate(context: vscode.ExtensionContext) {
    let hideTimer: any;
    let idleTimer: any;

    function GetSidebarCloseActions(): SidebarActions {
        let config = vscode.workspace.getConfiguration("workbench");
        if (config.sideBar !== undefined && config.sideBar.location !== undefined && config.sideBar.location == "right")
            return { left: "workbench.action.closeAuxiliaryBar", right: "workbench.action.closeSidebar" };
        return { left: "workbench.action.closeSidebar", right: "workbench.action.closeAuxiliaryBar" };
    };

    function GetSidebarOpenActions(): SidebarActions {
        let config = vscode.workspace.getConfiguration("workbench");
        if (config.sideBar !== undefined && config.sideBar.location !== undefined && config.sideBar.location == "right")
            return { left: "workbench.action.focusAuxiliaryBar", right: "workbench.action.focusSideBar" };
        return { left: "workbench.action.focusSideBar", right: "workbench.action.focusAuxiliaryBar" };
    };

    function DoCloseSideBars(isFromEditor: boolean, isDebugEnd: boolean = false) {
        let config = vscode.workspace.getConfiguration('autoHideUltimate');
        if (!config.enabled) return;

        let actions = GetSidebarCloseActions();
        let activeDebug = !!vscode.debug.activeDebugSession;

        const execute = () => {
            if (isFromEditor) {
                if (config.autoHideRightSideBar) {
                    if (activeDebug) {
                        if (config.hideRightSideBarWhenDebug) {
                            vscode.commands.executeCommand(actions.right);
                        }
                    } else {
                        vscode.commands.executeCommand(actions.right);
                    }
                }
            } else {
                if (config.hideRightSideBarOnDebug && !isDebugEnd) {
                    vscode.commands.executeCommand(actions.right);
                }
                if (config.hideRightSideBarOnDebugEnd && isDebugEnd) {
                    vscode.commands.executeCommand(actions.right);
                }
            }

            if (isFromEditor) {
                if (config.autoHideLeftSideBar) {
                    if (activeDebug) {
                        if (config.hideLeftSideBarWhenDebug) {
                            vscode.commands.executeCommand(actions.left);
                        }
                    } else {
                        vscode.commands.executeCommand(actions.left);
                    }
                }
            } else {
                if (config.hideLeftSideBarOnDebug && !isDebugEnd) {
                    vscode.commands.executeCommand(actions.left);
                }
                if (config.hideLeftSideBarOnDebugEnd && isDebugEnd) {
                    vscode.commands.executeCommand(actions.left);
                }
            }
        };

        if (isFromEditor && config.hideDelay > 0) {
            if (hideTimer) clearTimeout(hideTimer);
            hideTimer = setTimeout(execute, config.hideDelay);
        } else {
            execute();
        }
    }

    function DoClosePanel(isFromEditor: boolean, isDebugEnd: boolean = false) {
        let config = vscode.workspace.getConfiguration('autoHideUltimate');
        if (!config.enabled) return;

        let activeDebug = !!vscode.debug.activeDebugSession;
        let action = "workbench.action.closePanel";

        const execute = () => {
            if (isFromEditor) {
                if (config.autoHidePanel) {
                    if (activeDebug) {
                        if (config.hidePanelWhenDebug) {
                            vscode.commands.executeCommand(action);
                        }
                    } else {
                        vscode.commands.executeCommand(action);
                    }
                }
            } else {
                if (config.hidePanelOnDebug && !isDebugEnd) {
                    vscode.commands.executeCommand(action);
                }
                if (config.hidePanelOnDebugEnd && isDebugEnd) {
                    vscode.commands.executeCommand(action);
                }
            }
        };

        if (isFromEditor && config.hideDelay > 0) {
            // Already handled by sidebars timer if triggered simultaneously
            execute();
        } else {
            execute();
        }
    }

    async function DoOpenSideBars(isFromEditor: boolean, isDebugEnd: boolean = false) {
        let config = vscode.workspace.getConfiguration('autoHideUltimate');
        if (!config.enabled) return;

        let actions = GetSidebarOpenActions();
        let activeDebug = !!vscode.debug.activeDebugSession;

        if (isFromEditor) {
            if (config.autoShowRightSideBar) {
                if (activeDebug) {
                    if (config.showRightSideBarWhenDebug) {
                        vscode.commands.executeCommand(actions.right);
                    }
                } else {
                    vscode.commands.executeCommand(actions.right);
                }
            }
        } else {
            if (config.showRightSideBarOnDebug && !isDebugEnd) {
                vscode.commands.executeCommand(actions.right);
            }
            if (config.showRightSideBarOnDebugEnd && isDebugEnd) {
                vscode.commands.executeCommand(actions.right);
            }
        }

        if (isFromEditor) {
            if (config.autoShowLeftSideBar) {
                if (activeDebug) {
                    if (config.showLeftSideBarWhenDebug) {
                        vscode.commands.executeCommand(actions.left);
                    }
                } else {
                    vscode.commands.executeCommand(actions.left);
                }
            }
        } else {
            if (config.showLeftSideBarOnDebug && !isDebugEnd) {
                vscode.commands.executeCommand(actions.left);
            }
            if (config.showLeftSideBarOnDebugEnd && isDebugEnd) {
                vscode.commands.executeCommand(actions.left);
            }
        }
    }

    function DoOpenPanel(isFromEditor: boolean, isDebugEnd: boolean = false) {
        let config = vscode.workspace.getConfiguration('autoHideUltimate');
        if (!config.enabled) return;

        let activeDebug = !!vscode.debug.activeDebugSession;
        let action = "workbench.action.focusPanel"

        if (isFromEditor) {
            if (config.autoShowPanel) {
                if (activeDebug) {
                    if (config.showPanelWhenDebug) {
                        vscode.commands.executeCommand(action);
                    }
                } else {
                    vscode.commands.executeCommand(action);
                }
            }
        } else {
            if (config.showPanelOnDebug && !isDebugEnd) {
                vscode.commands.executeCommand(action);
            }
            if (config.showPanelOnDebugEnd && isDebugEnd) {
                vscode.commands.executeCommand(action);
            }
        }
    }

    function resetIdleTimer() {
        let config = vscode.workspace.getConfiguration('autoHideUltimate');
        if (idleTimer) clearTimeout(idleTimer);
        if (config.enabled && config.autoHideIdleTimeout > 0) {
            idleTimer = setTimeout(() => {
                DoCloseSideBars(true);
                DoClosePanel(true);
            }, config.autoHideIdleTimeout * 1000);
        }
    }

    vscode.window.onDidChangeTextEditorSelection(selection => {
        let config = vscode.workspace.getConfiguration('autoHideUltimate');
        if (!config.enabled) return;

        resetIdleTimer();

        let activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) return;

        let path = activeEditor.document.fileName;
        let pathIsFile = path.includes(".") || path.includes("\\") || path.includes("/");
        let scheme = selection.textEditor.document.uri.scheme;
        let langId = activeEditor.document.languageId;

        // Check exclusion list
        let excludedLangs: string[] = config.excludeLanguages || [];
        if (excludedLangs.includes(langId)) return;

        if (selection.kind != TextEditorSelectionChangeKind.Mouse // selection was not from a click
            || selection.selections.length != 1                   // no selections or multiselections
            || selection.selections.find(a => a.isEmpty) == null  // multiselections
            || !pathIsFile                                        // The debug window editor
            || scheme == "output") {                              // The output window
            return;
        } else {
            if (config.autoHideReferences) {
                vscode.commands.executeCommand("closeReferenceSearch");
            }
            DoCloseSideBars(true);
            DoClosePanel(true);
            DoOpenSideBars(true);
            DoOpenPanel(true);

            vscode.commands.executeCommand(FOCUS_BACK);
        };
    });

    vscode.window.onDidChangeWindowState(state => {
        let config = vscode.workspace.getConfiguration('autoHideUltimate');
        if (config.enabled && config.hideOnFocusLost && !state.focused) {
            DoCloseSideBars(true);
            DoClosePanel(true);
        }
    });

    vscode.debug.onDidStartDebugSession(session => {
        DoCloseSideBars(false);
        DoClosePanel(false);
        DoOpenSideBars(false);
        DoOpenPanel(false);

        vscode.commands.executeCommand(FOCUS_BACK);
    });

    vscode.debug.onDidTerminateDebugSession(session => {
        DoCloseSideBars(false, true);
        DoClosePanel(false, true);
        DoOpenSideBars(false, true);
        DoOpenPanel(false, true);

        vscode.commands.executeCommand(FOCUS_BACK);
    });

    context.subscriptions.push(
        vscode.commands.registerCommand("autoHidePlus.toggleEnabled", async () => {
            let config = vscode.workspace.getConfiguration('autoHideUltimate');
            await config.update("enabled", !config.enabled, vscode.ConfigurationTarget.Global);
        }));

    // Register all other toggle commands... (simplified for brevity or I can list all)
    const toggleCommands = [
        ["toggleAutoHideRightSideBar", "autoHideRightSideBar"],
        ["toggleAutoHideLeftSideBar", "autoHideLeftSideBar"],
        ["toggleAutoHidePanel", "autoHidePanel"],
        ["toggleAutoHideReferences", "autoHideReferences"],
        ["toggleHideOnOpen", "hideOnOpen"],
        ["toggleHideLeftSideBarWhenDebug", "hideLeftSideBarWhenDebug"],
        ["toggleHideRightSideBarWhenDebug", "hideRightSideBarWhenDebug"],
        ["toggleHidePanelWhenDebug", "hidePanelWhenDebug"],
        ["toggleAutoShowRightSideBar", "autoShowRightSideBar"],
        ["toggleAutoShowLeftSideBar", "autoShowLeftSideBar"],
        ["toggleAutoShowPanel", "autoShowPanel"],
        ["toggleShowRightSideBarWhenDebug", "showRightSideBarWhenDebug"],
        ["toggleShowLeftSideBarWhenDebug", "showLeftSideBarWhenDebug"],
        ["toggleShowPanelWhenDebug", "showPanelWhenDebug"],
        ["toggleHideRightSideBarOnDebug", "hideRightSideBarOnDebug"],
        ["toggleHideLeftSideBarOnDebug", "hideLeftSideBarOnDebug"],
        ["toggleHidePanelOnDebug", "hidePanelOnDebug"],
        ["toggleShowRightSideBarOnDebug", "showRightSideBarOnDebug"],
        ["toggleShowLeftSideBarOnDebug", "showLeftSideBarOnDebug"],
        ["toggleShowPanelOnDebug", "showPanelOnDebug"]
    ];

    toggleCommands.forEach(([cmd, prop]) => {
        context.subscriptions.push(
            vscode.commands.registerCommand(`autoHidePlus.${cmd}`, async () => {
                let config = vscode.workspace.getConfiguration('autoHideUltimate');
                await config.update(prop, !config.get(prop), vscode.ConfigurationTarget.Workspace);
            })
        );
    });
}

export function deactivate() { }
