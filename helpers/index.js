async function tryController(controller, req, res, next) {
    if (controller && typeof controller === 'function') {
        try {
            if (controller.constructor.name === 'AsyncFunction') {
                await controller(req, res, next);

            } else {
                controller(req, res, next);
                
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

module.exports = {tryController}