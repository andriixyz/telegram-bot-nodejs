class BotProcedureController {
  constructor() {
    this.procedures = [];
  }
  checkExistProcedure(name) {
    for (let i = 0; i < this.procedures.length; ++i) {
      if (this.procedures[i].name == name) {
        return this.procedures[i];
      }
    }
    return false;
  }
  addProcedure(name) {
    if (this.checkExistProcedure(name)) {
      return;
    } else {
      this.procedures.push(new BotProcedure(name));
    }
  }

  getProcedure(name) {
    for (let i = 0; i < this.procedures.length; ++i) {
      if (this.procedures[i].name == name) {
        return this.procedures[i];
      }
    }
    return null;
  }
  getProceduresNames() {
    var result = [];
    for (let i = 0; i < this.procedures.length; ++i) {
      result.push(this.procedures[i].name);
    }
    return result;
  }
}
class BotProcedure {
  constructor(name) {
    this.name = name;
    this.stages = [];
    this.parameters = null;
  }
  addStage(name, callback) {
    this.stages.push(new BotStage(name, callback));
  }
  checkExistStage(name, procedureName) {
    for (let i = 0; i < this.procedures.length; ++i) {
      if (this.procedures[i].name == procedureName) {
        return true;
      }
    }
    return false;
  }
  execute(parameters, stage) {
    this.parameters = parameters;
    for (let i = 0; i < this.stages.length; ++i) {
      if (this.stages[i].name == stage) {
        this.stages[i].callBack();
      }
    }
  }
  getStagesNames() {
    var result = [];
    for (let i = 0; i < this.stages.length; ++i) {
      result.push(this.stages[i].name);
    }
    return result;
  }
}
class BotStage {
  constructor(name, callBack) {
    this.name = name;
    this.callBack = callBack;
  }
}

exports.BotProcedureController = BotProcedureController;
