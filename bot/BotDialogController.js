class BotDialogController {
  constructor(procedures) {
    this.nodeDialogs = [];
    this.procedures = procedures;
  }
  addNode(userID) {
    this.nodeDialogs.push(new NodeDialog(userID, 0, 0));
  }
  nodeExist(userID) {
    for (let i = 0; i < this.nodeDialogs.length; ++i) {
      if (this.nodeDialogs[i].userID == userID) {
        return this.nodeDialogs[i];
      }
    }
    return false;
  }
  createNodeIfNotExist(userID) {
    if (!this.nodeExist(userID)) {
      this.addNode(userID);
    }
  }
  getNode(userID) {
    return this.nodeExist(userID);
  }
}

class NodeDialog {
  constructor(userID, state, procedure) {
    this.userID = userID;
    this.state = state;
    this.procedure = procedure;
  }
  set(state, procedure) {
    this.state = state;
    this.procedure = procedure;
  }
  changeState(state) {
    this.state = state;
  }
  changeProcedure(procedure) {
    this.procedure = procedure;
    this.state = 1;
  }
  getState() {
    return this.state;
  }
  resetNode() {
    this.state = 0;
    this.procedure = 0;
  }
}

exports.BotDialogController = BotDialogController;
