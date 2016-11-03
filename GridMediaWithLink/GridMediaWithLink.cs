using %SolutionName%.App.Mappers;
using %SolutionName%.App.Models.Helpers;
using System;
using Umbraco.Core.Models;
using Umbraco.Web;

namespace %SolutionName%.App.App_Plugins.GridMediaWithLink
{
	public class GridMediaWithLinkModel
    {
        public int? ImageId { get; set; }

        private UmbracoImage image = null;
        public UmbracoImage Image
        {
            get
            {
                if (image == null && ImageId != null)
                {
                    image = UmbracoImageMapper.Map<UmbracoImage>(Convert.ToInt32(ImageId));
                }
                return image;
            }
        }
        public string ImageTitle { get; set; }
        public int? InternalContentId { get; set; }
        public string UrlMode { get; set; }
        public bool IsExternal
        {
            get { return UrlMode == null || UrlMode.ToLower() != "internal"; }
        }
        public string ExternalUrl { private get; set; }

        private string url;
        public string Url
        {
            get
            {
                if (UrlMode == "internal")
                {
                    if (InternalContentId != null && InternalContentId != default(int))
                    {
                        UmbracoHelper UH = new UmbracoHelper(UmbracoContext.Current);
                        IPublishedContent ipc = UH.TypedContent(InternalContentId);
                        if (ipc != null && ipc.Id > 0)
                            url = ipc.Url;
                    }
                }
                else if (UrlMode == "external")
                {
                    url = ExternalUrl;
                }
                return url;
            }
        }
    }
}