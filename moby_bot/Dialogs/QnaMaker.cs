using Microsoft.Bot.Connector;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace moby_bot.Dialogs
{
    public class QnaMaker
    {
        //This Method is passed in an user activity object and return QnaMakerResult object from the QnA Maker REST API.
        public static QnAMakerResult GetQnaReply(Activity activity)
        {
            string responseString = string.Empty;

            var query = activity.Text; //User Query
            var knowledgebaseId = "aaf35a44-6c3f-4006-8181-453f6cc91793"; // Use knowledge base id created.
            var qnamakerSubscriptionKey = "e4d55756fa9b47d5a2925cd49690fc86"; //Use subscription key assigned to you.
            QnAMakerResult qnaMakerResponse;

            //Build the URI
            Uri qnamakerUriBase = new Uri("https://westus.api.cognitive.microsoft.com/qnamaker/v1.0");
            var builder = new UriBuilder($"{qnamakerUriBase}/knowledgebases/{knowledgebaseId}/generateAnswer");

            //Add the question as part of the body
            var postBody = $"{{\"question\": \"{query}\"}}";

            //Send the POST request
            using (WebClient client = new WebClient())
            {
                //Set the encoding to UTF8
                client.Encoding = System.Text.Encoding.UTF8;

                //Add the subscription key header
                client.Headers.Add("Ocp-Apim-Subscription-Key", qnamakerSubscriptionKey);
                client.Headers.Add("Content-Type", "application/json");
                responseString = client.UploadString(builder.Uri, postBody);

                //De-serialize the response
                try
                {
                    qnaMakerResponse = JsonConvert.DeserializeObject<QnAMakerResult>(responseString);
                }
                catch
                {
                    throw new Exception("Unable to deserialize QnA Maker response string.");
                }
            }
            return qnaMakerResponse;
        }
    }

    //This method helps de-serialize the JSON object
    public class QnAMakerResult
    {
        /// <summary>
        /// The top answer found in the QnA Service.
        /// </summary>
        [JsonProperty(PropertyName = "answer")]
        public string Answer { get; set; }

        /// <summary>
        /// The score in range [0, 100] corresponding to the top answer found in the QnA    Service.
        /// </summary>
        [JsonProperty(PropertyName = "score")]
        public double Score { get; set; }
    }
}