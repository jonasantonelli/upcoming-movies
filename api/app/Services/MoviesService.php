<?php

namespace App\Services;

use App\Cache\CacheFacade;
use App\Models\Movie;
use App\Models\MovieDetails;
use GuzzleHttp\Client;

class MoviesService
{

    private $url;
    private $apiKey;
    private $client;
    private $genreService;
    private $genreList;

    public function __construct(GenresService $gs)
    {
        $this->client = new Client();
        $this->genreService = $gs;
        $this->genreList = $this->genreService->getList();

        $this->apiKey = env('TMDB_API_KEY');
        $this->url = env('TMDB_API_URL');
    }

    /**
     * @param $page
     *
     * @return array|mixed|null
     */
    public function getUpcoming($page)
    {
        try
        {
            if(empty($page)) {
                $page = 1;
            }

            $cacheKey = 'movieUpcoming:' . $page;

            $cacheContent = CacheFacade::get($cacheKey);

            if(!empty($cacheContent)) {
                $result = json_decode($cacheContent, true);
                return $result;
            }

            $response = $this->client->get($this->url . 'movie/upcoming?api_key=' . $this->apiKey . '&page=' . $page);
            $body = $response->getBody()->getContents();

            $content = json_decode($body);

            if(empty($content) || !isset($content->results))
            {
                return null;
            }

            $result = [];

            foreach($content->results as $movie)
            {
                $item = new Movie();
                $item->id = $movie->id;
                $item->name = $movie->title;
                $item->poster = $movie->poster_path;

                $genreIds = $movie->genre_ids;
                $genres = [];
                foreach($genreIds as $id)
                {
                    array_push($genres, $this->genreList[$id]);
                }
                $item->genre = $genres;
                $item->release = $movie->release_date;
                array_push($result, $item);
            }

            $data = new \stdClass();
            $data->result = $result;
            $data->totalResults = $content->total_results;
            $data->totalPages = $content->total_pages;

            CacheFacade::put($cacheKey, json_encode($data), CacheFacade::EXPIRATION_FROM_10_MINUTES);

            return $data;
        }
        catch (\Exception $err)
        {
            error_log($err);
        }
    }


    /**
     * @param $id
     *
     * @return MovieDetails|bool|mixed|null
     */
    public function getDetails($id)
    {
        try
        {
            if(empty($id)) {
                return false;
            }

            $cacheKey = 'movieDetails:' . $id;

            $cacheContent = CacheFacade::get($cacheKey);

            if(!empty($cacheContent)) {
                $result = json_decode($cacheContent, true);
                return $result;
            }

            $response = $this->client->get($this->url . 'movie/ ' . $id . '?api_key=' . $this->apiKey);
            $body = $response->getBody()->getContents();

            $content = json_decode($body);

            if(empty($content))
            {
                return null;
            }

            $detail = new MovieDetails();
            $detail->id = $content->id;
            $detail->name = $content->title;
            $detail->poster = $content->poster_path;
            $detail->genre = $content->genres;
            $detail->release = $content->release_date;
            $detail->overview = $content->overview;

            CacheFacade::put($cacheKey, json_encode($detail), CacheFacade::EXPIRATION_FROM_10_MINUTES);

            return $detail;
        }
        catch (\Exception $err)
        {
            error_log($err);
        }

    }

    /**
     * @param $query
     * @param $page
     *
     * @return array|bool|null
     */
    public function search($query, $page)
    {
        try
        {
            if(empty($page)) {
                $page = 1;
            }

            if(empty($query)) {
                return false;
            }

            $response = $this->client->get($this->url . 'search/movie?api_key=' . $this->apiKey . '&query=' . $query . '&page=' . $page);
            $body = $response->getBody()->getContents();

            $content = json_decode($body);

            if(empty($content) || !isset($content->results))
            {
                return null;
            }

            $result = [];

            foreach($content->results as $movie)
            {
                $item = new Movie();
                $item->id = $movie->id;
                $item->name = $movie->title;
                $item->poster = $movie->poster_path;
                $item->genre = $movie->genre_ids;
                $item->release = $movie->release_date;

                array_push($result, $item);
            }

            $data = new \stdClass();
            $data->result = $result;
            $data->totalResults = $content->total_results;
            $data->totalPages = $content->total_pages;

            return $data;
        }
        catch (\Exception $err)
        {
            error_log($err);
        }

    }
}