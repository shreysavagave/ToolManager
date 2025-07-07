const Tool = require('../../models/Tool');

const User = require('../../models/User');
const sendEmail = require('../../utils/sendmails');


const checkToolLifeAndNotify = async () => {
  let supervisorMailsSent = 0;
  let devEngMailsSent = 0;

  try {
    const tools = await Tool.find();

    for (const tool of tools) {
      const lifeUsed = (tool.currentAge / tool.lifeSpan) * 100;

      // Notify Supervisor
      if (lifeUsed >= 90 && lifeUsed < 100) {
        const supervisors = await User.find({ role: "supervisor" });

        for (const supervisor of supervisors) {
          await sendEmail(
            supervisor.email,
            `Tool life warning: ${tool.name}`,
            `Tool "${tool.name}" has reached ${Math.floor(lifeUsed)}% of its life. Please consider replacing.`
          );
          supervisorMailsSent++;
        }

        tool.notifiedSupervisor = true;
        await tool.save();
      }

      // Notify DevEng
      if (lifeUsed >= 100) {
        const devEngs = await User.find({ role: "admin" });

        for (const devEng of devEngs) {
          await sendEmail(
            devEng.email,
            `Tool life exceeded: ${tool.name}`,
            `Tool "${tool.name}" has exceeded 100% of its life. Please take immediate action.`
          );
          devEngMailsSent++;
        }

        tool.notifiedDevEng = true;
        await tool.save();
      }
    }

    console.log(`✅ Emails sent: ${supervisorMailsSent} to supervisors, ${devEngMailsSent} to dev engineers`);
  } catch (error) {
    console.error("❌ Error in tool life check:", error);
  }
};

module.exports = checkToolLifeAndNotify;
