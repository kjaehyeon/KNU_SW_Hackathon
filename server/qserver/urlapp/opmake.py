import metadata_parser


page = metadata_parser.MetadataParser(url="http://www.naver.com")
print(page.get_metadatas('title', strategy=['og']))
print(page.get_metadatas('description', strategy=['og']))
print(page.get_metadatas('image', strategy=['og']))