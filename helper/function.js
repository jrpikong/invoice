module.exports = {
    parameterValidator: function(req) {
      return new Promise((resolve, reject) => {
        try {
          req.getValidationResult().then(function(result) {
            if (result.array().length) {
              LIBRARY.status.ERROR.MISSING_PARAMETER.PAYLOAD = [];
  
              for (
                var i = 0, arrayLength = result.array().length;
                i < arrayLength;
                i++
              ) {
                var currentError = result.array()[i];
                LIBRARY.status.ERROR.MISSING_PARAMETER.PAYLOAD.push(currentError);
              }
  
              reject(LIBRARY.status.ERROR.MISSING_PARAMETER);
            }
            resolve();
          });
        } catch (err) {
          reject(err);
        }
      });
    },
}