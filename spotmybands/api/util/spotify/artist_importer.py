from spotmybands.api.util.importer import Importer


class ArtistImporter(Importer):
    def process(self):
        self.output = {}
        self.output['id'] = self.input_data['id']
        self.output['name'] = self.input_data['name']
        if self.input_data.get('images'):
            self.output['logoURL'] = self.input_data['images'][0]['url']
        self.output['genres'] = self.input_data['genres']
        return self.output
        

    