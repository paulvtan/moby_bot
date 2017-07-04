using System;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using System.Threading;
using Newtonsoft.Json;
using AdaptiveCards;
using System.Collections.Generic;

namespace moby_bot.Dialogs
{
    [Serializable]
    public class RootDialog : IDialog<object>
    {
        public Task StartAsync(IDialogContext context)
        {
            context.Wait(MessageReceivedAsync);

            return Task.CompletedTask;
        }

        private async Task MessageReceivedAsync(IDialogContext context, IAwaitable<object> result)
        {
            var activity = await result as Activity;

            //Call GetQnaReply to get the result
            QnAMakerResult qnaMakeReply = QnaMaker.GetQnaReply(activity);

            //Reply to user
            string qnaAnswer = qnaMakeReply.Answer;
            await context.PostAsync(qnaAnswer.Substring(2, qnaAnswer.Length - 2));
            //-----------------------------------------------------


            //2nd Level Reply
            string scenarioCode = qnaAnswer.Substring(0, 2);
            switch (scenarioCode)
            {
                case "11":
                    Thread.Sleep(3000);
                    Activity replyToUser = createCardActivity(activity, "Would you like me to help you allocate this transaction to the right account?", 11);
                    await context.PostAsync(replyToUser);
                    break;
            }

            context.Wait(MessageReceivedAsync);
        }


        //Create Hero Yes and No card
        public static Activity createCardActivity(Activity activity,string text, int scenarioNo)
        {
            var heroCard = new HeroCard
            {
                Text = text,
                Buttons = new List<CardAction> { new CardAction("invoke", "Yes", value: "Yes"), new CardAction("imBack", "No", value: "No") }
            };
            Activity replyToConversation = activity.CreateReply();
            // Create the attachment.
            Attachment attachment = heroCard.ToAttachment();
            replyToConversation.Attachments.Add(attachment);
            return replyToConversation;
        }
    }
}